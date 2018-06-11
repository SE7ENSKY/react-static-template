import v4 from 'uuid/v4';

export default arr => arr.map(item => ({ id: v4(), value: item }));
