import { calcularEdad } from '../../domain/calcularEdad';

describe('Calcular Edad', () => {

    test('debe calcular la edad por la fecha de nacimiento', () => {
        const fechaNacimiento: Date = new Date();
        fechaNacimiento.setFullYear(1990);

        expect(calcularEdad(fechaNacimiento).edad).toBe(31);
    });

    test('No debe recibir una fecha mayor a la actual', () => {
        const fechaDeNacimiento: Date = new Date();
        fechaDeNacimiento.setFullYear(2250);

        expect(calcularEdad(fechaDeNacimiento).error).toBe('Año invalido');
    });

});
