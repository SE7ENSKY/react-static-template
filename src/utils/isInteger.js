export default Number.isInteger || (value => typeof value === 'number' && Number.isFinite(value) && !(value % 1));
