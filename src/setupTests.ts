import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom';
import { setGlobalConfig } from '@storybook/testing-react';
// Storybook's preview file location
import * as globalStorybookConfig from '../.storybook/preview';

setGlobalConfig(globalStorybookConfig);

Enzyme.configure({ adapter: new Adapter() });
