import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import { Controller } from 'react-hook-form';

export const CustomDatePicker = ({ name, control, setValue, errors, ...props }, ref) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          if (!field) return null; // Предотвращаем ошибку, если field не инициализировано

          return (
            <DatePicker
              {...field} // Передаем все поля из field
              {...props}
              ref={ref}
              selected={field.value ? new Date(field.value) : null}
              onChange={date => setValue(name, date)}
            />
          );
        }}
      />
      {errors && <p className="error">{errors.message}</p>}
    </div>
  );
};
