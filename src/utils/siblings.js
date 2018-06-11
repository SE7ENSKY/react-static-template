export default el => Array.prototype.filter.call(el.parentNode.children, child => child !== el);
