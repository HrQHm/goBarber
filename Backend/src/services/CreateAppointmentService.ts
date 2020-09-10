import {startOfHour} from 'date-fns'
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    public async execute({date, provider}:Request): Promise<Appointment>{
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);//regra de negocio

        const findAppointmentIsSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentIsSameDate){
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
