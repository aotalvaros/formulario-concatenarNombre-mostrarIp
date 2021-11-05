import { calcularEdad } from '../../domain/calcularEdad';

describe('Calcular Edad', () => {
   
    test('debe calcular la edad por la fecha de nacimiento', () => { 
        const añoActual = 2021;
        const arrayFechaNacimiento = {
            fechaDeNacimiento: 1990
        };
        const resultadoEdad = añoActual - arrayFechaNacimiento.fechaDeNacimiento;
        
        expect(calcularEdad(arrayFechaNacimiento).añoActual).toBe(resultadoEdad);
    });

    test('No debe recibir una fecha mayor a la actual', () => {;
        const arrayFechaNacimiento = {
            fechaDeNacimiento: 2050
        };

        expect(calcularEdad(arrayFechaNacimiento).error).toBe('Año invalido');
    });
    
});
