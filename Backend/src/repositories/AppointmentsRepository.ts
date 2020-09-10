import Appointment from '../models/Appointments';
import {EntityRepository, Entity, Repository} from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{
    public async findByDate(date:Date) : Promise<Appointment | null>{
        //const findAppointment = this.appointments.find(appointment =>
        //    isEqual(date, appointment.date),
        //);

        const findAppointment = await this.findOne({
            where:{ date: date},
        });
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
