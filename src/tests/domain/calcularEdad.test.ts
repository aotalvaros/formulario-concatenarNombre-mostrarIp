import { calcularEdad } from '../../domain/calcularEdad';

describe('Calcular Edad', () => {
    let fechaDeNacimiento: Date;
    beforeAll(() => {
       fechaDeNacimiento = new Date();
    });

    test('debe calcular la edad por la fecha de nacimiento', () => {
        fechaDeNacimiento.setFullYear(1990);

        expect(calcularEdad(fechaDeNacimiento).edad).toBe(31);
    });

    test('debe calcular la edad por la fecha de nacimiento, segunda prueba', () => {
        fechaDeNacimiento.setFullYear(2000);

        expect(calcularEdad(fechaDeNacimiento).edad).toBe(21);
    });

    test('No debe recibir una fecha mayor a la actual', () => {
        fechaDeNacimiento.setFullYear(2250);

        expect(calcularEdad(fechaDeNacimiento).error).toBe('Ups! ingresa una fecha que no sea mayor a la actual');
    });

    test('No debe recibir una fecha mayor a la actual, segunda prueba', () => {
        fechaDeNacimiento.setFullYear(2023);

        expect(calcularEdad(fechaDeNacimiento).error).toBe('Ups! ingresa una fecha que no sea mayor a la actual');
    });
});
