import '@testing-library/jest-dom';
import { concatenarNombre } from '../../domain/concatenarNombre';

describe('Concatenar Nombre', () => {
    
    test('debe concatenar nombres y apellidos', () => {
       const arrayValores = {
           nombre1: 'Andres',
           nombre2: 'Dario',
           apellido1: 'Otalvaro',
           apellido2: 'Sanchez' 
       };

       expect(concatenarNombre(arrayValores)).toBe('Andres Dario Otalvaro Sanchez')
    });
    
    
});
