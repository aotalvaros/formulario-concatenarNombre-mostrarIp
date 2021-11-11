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

    test('debe concatenar nombres y apellidos, segunda prueba', () => {
        const arrayNombre = {
            primerNombre: "Pepito",
            segundoNombre: "Pablo",
            primerApellido: "Perez",
            segundoApellido: "Pulgada" 
        };
 
        expect(concatenarNombre(arrayNombre)).toBe('Pepito Pablo Perez Pulgada');
     });
    
    test('debe concatenar primer nombre y primer apellido', () => {
        const arrayNombre = {
            primerNombre: 'Andres',
            primerApellido: 'Otalvaro',
        };
        
        expect(concatenarNombre(arrayNombre)).toBe('Andres Otalvaro');
    });

    test('debe concatenar primer nombre y primer apellido, segunda prueba', () => {
        const arrayNombre = {
            primerNombre: 'Luis',
            primerApellido: 'Quintero',
        };
        
        expect(concatenarNombre(arrayNombre)).toBe('Luis Quintero');
    });

    test('No debe concatenar espacios en el nombre', () => {
        const arrayNombre = {
            primerNombre: 'Andres ',
            segundoNombre: ' Dario',
            primerApellido: 'Otalvaro ',
            segundoApellido: '    Sanchez' 
        };

        expect(concatenarNombre(arrayNombre)).toBe('Andres Dario Otalvaro Sanchez');
    });

    test('No debe concatenar espacios en el nombre, segunda prueba', () => {
        const arrayNombre = {
            primerNombre: '  Pedro   ',
            segundoNombre: '      Leon  ',
            primerApellido: '  Restrepo  ',
            segundoApellido: ' Perez   ' 
        };

        expect(concatenarNombre(arrayNombre)).toBe('Pedro Leon Restrepo Perez');
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

    test('debe concatenar nombre en mayusculas y minusculas, segunda prueba', () => {
        const arrayNombre = {
            primerNombre: 'pePitO',
            segundoNombre: 'pABLo',
            primerApellido: 'PeReZ',
            segundoApellido: 'SanchEZ' 
        };
 
        expect(concatenarNombre(arrayNombre)).toBe('pePitO pABLo PeReZ SanchEZ');
    });
       
});
