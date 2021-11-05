import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';

//@ts-ignore
expect.addSnapshotSerializer(createSerializer({
    mode: 'deep',
    noKey: true
 }));

Enzyme.configure({ adapter: new Adapter() });
