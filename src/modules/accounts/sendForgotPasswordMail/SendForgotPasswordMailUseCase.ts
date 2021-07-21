import { AppError } from "@shared/errors/AppError";
import { v4 as uuidV4} from "uuid"
import { resolve } from "path"

import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/provider/DateProvider/IDateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/provider/MailProvider/IMailProvider";


@injectable()
class SendForgotPasswordMailUseCase {
    
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ){}
    
    async execute(email:string): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname,"..","views","emails","forgotPassword.hbs");

        if(!user){
            throw new AppError("User does not exists!",404)
        } 

        const refresh_token = uuidV4();

        const expires_date = this.dayjsDateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token,
            user_id: user.id,
            expires_date
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${refresh_token}`
        }

        await this.mailProvider.sendMail(email, "Recuperação de senha",variables,templatePath )


    }

}

export {SendForgotPasswordMailUseCase}