import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "./Car";

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToMany(() => Car, (car) => car.specifications)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "specification_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "car_id" }],
  })
  cars!: Car[];

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Specification };
