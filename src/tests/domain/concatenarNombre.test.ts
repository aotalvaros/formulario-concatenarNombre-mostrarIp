import '@testing-library/jest-dom';
import { concatenarNombre } from '../../domain/concatenarNombre';
import { INombre } from '../../interface/INombre';

describe('Concatenar Nombre', () => {

    let nombreUno: INombre;
    let nombreDos: INombre;
    let nombreTres: INombre;
    let nombreCuatro: INombre;
    let nombreCinco: INombre;
    let nombreSeis: INombre;
    let nombreSiete: INombre;
    let nombreOcho: INombre;

    beforeEach(() => {
        nombreUno = {
            primerNombre: 'Andres',
            segundoNombre: 'Dario',
            primerApellido: 'Otalvaro',
            segundoApellido: 'Sanchez' 
        };
        nombreDos = {
            primerNombre: "Pepito",
            segundoNombre: "Pablo",
            primerApellido: "Perez",
            segundoApellido: "Pulgada" 
        };
        nombreTres = {
            primerNombre: 'Andres',
            primerApellido: 'Otalvaro'
        };
        nombreCuatro = {
            primerNombre: 'Luis',
            primerApellido: 'Quintero'
        };
        nombreCinco = {
            primerNombre: 'Andres ',
            segundoNombre: ' Dario',
            primerApellido: 'Otalvaro ',
            segundoApellido: '    Sanchez' 
        };
        nombreSeis = {
            primerNombre: '  Pedro   ',
            segundoNombre: '      Leon  ',
            primerApellido: '  Restrepo  ',
            segundoApellido: ' Perez   ' 
        };
        nombreSiete = {
            primerNombre: 'AnDrEs',
            segundoNombre: 'DaRIo',
            primerApellido: 'otalvarO',
            segundoApellido: 'SanchEZ' 
        };
        nombreOcho = {
            primerNombre: 'pePitO',
            segundoNombre: 'pABLo',
            primerApellido: 'PeReZ',
            segundoApellido: 'SanchEZ' 
        };
    });
    
    test('debe concatenar nombres y apellidos', () => {
        expect(concatenarNombre(nombreUno)).toBe('Andres Dario Otalvaro Sanchez');
    });

    test('debe concatenar nombres y apellidos, segunda prueba', () => {
        expect(concatenarNombre(nombreDos)).toBe('Pepito Pablo Perez Pulgada');
     });
    
    test('debe concatenar primer nombre y primer apellido', () => {        
        expect(concatenarNombre(nombreTres)).toBe('Andres Otalvaro');
    });

    test('debe concatenar primer nombre y primer apellido, segunda prueba', () => {
        expect(concatenarNombre(nombreCuatro)).toBe('Luis Quintero');
    });

    test('No debe concatenar espacios en el nombre', () => {
        expect(concatenarNombre(nombreCinco)).toBe('Andres Dario Otalvaro Sanchez');
    });

    test('No debe concatenar espacios en el nombre, segunda prueba', () => {
        expect(concatenarNombre(nombreSeis)).toBe('Pedro Leon Restrepo Perez');
    });
    
    test('debe concatenar nombre en mayusculas y minusculas', () => {
        expect(concatenarNombre(nombreSiete)).toBe('AnDrEs DaRIo otalvarO SanchEZ');
    });

    test('debe concatenar nombre en mayusculas y minusculas, segunda prueba', () => {
        expect(concatenarNombre(nombreOcho)).toBe('pePitO pABLo PeReZ SanchEZ');
    });
       
});
