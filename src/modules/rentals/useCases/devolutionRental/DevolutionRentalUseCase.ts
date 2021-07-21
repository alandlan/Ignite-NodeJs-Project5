import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    id: string;
    userId: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({id, userId}: IRequest): Promise<Rental>{
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const mininum_daily = 1;

        if(!rental){
            throw new AppError("Rental does not exists!")
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

        if(daily <= 0){
            daily = mininum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;
        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        console.log(rental);
        console.log(car);

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id,true);

        return rental;

    }
}

export { DevolutionRentalUseCase}