import '@testing-library/jest-dom';
import { concatenarNombre } from '../../domain/concatenarNombre';

describe('Concatenar Nombre', () => {
    
    test('debe concatenar nombres y apellidos', () => {
       const arrayNombre = {
           primerNombre: 'Andres',
           segundoNombre: 'Dario',
           primerApellido: 'Otalvaro',
           segundoApellido: 'Sanchez' 
       };

       expect(concatenarNombre(arrayNombre)).toBe('Andres Dario Otalvaro Sanchez');
    });
    
    test('debe concatenar primer nombre y primer apellido', () => {
        const arrayNombre = {
            primerNombre: 'Andres',
            primerApellido: 'Otalvaro',
        };
        
        expect(concatenarNombre(arrayNombre)).toBe('Andres Otalvaro');
    });

    test('No debe concatenar espacios en el nombre', () => {
        const arrayNombre = {
            primerNombre: 'Andrés ',
            segundoNombre: ' Dario',
            primerApellido: 'Otalvaro ',
            segundoApellido: '    Sánchez' 
        };

        expect(concatenarNombre(arrayNombre)).toBe('Andrés Dario Otalvaro Sánchez');
    });
    
    test('debe concatenar nombre en mayusculas y minusculas', () => {
        const arrayNombre = {
            primerNombre: 'AnDrEs',
            segundoNombre: 'DaRIo',
            primerApellido: 'otalvarO',
            segundoApellido: 'SanchEZ' 
        };
 
        expect(concatenarNombre(arrayNombre)).toBe('AnDrEs DaRIo otalvarO SanchEZ');
    });
       
});
