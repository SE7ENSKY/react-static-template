import { findIndex, forOwn } from 'lodash';

class ViewportObserver {
	constructor(options) {
		const opts = options || {};

		this._observer = new IntersectionObserver(this.handleObserve, {
			rootMargin: opts.rootMargin || '-30px 0px',
			threshold: opts.threshold || 0.01,
		});

		this._eventHandlers = {
			enter: [],
			leave: [],
		};
	}

	handleObserve = (entries) => {
		for (let i = 0, len = entries.length; i < len; i += 1) {
			const entry = entries[i];
			const { intersectionRatio, target } = entry;
			const cl = target.classList;

			if (intersectionRatio > 0) {
				if (cl.contains('in-viewport')) {
					cl.remove('in-viewport');
					this.handleEvent('leave', target);
				} else {
					cl.add('in-viewport');
					this.handleEvent('enter', target);
				}
			} else {
				if (!cl.contains('in-viewport')) return;
				cl.remove('in-viewport');
				this.handleEvent('leave', target);
			}
		}
	}

	handleEvent(type, target) {
		const targets = this._eventHandlers[type];
		const index = findIndex(targets, el => el.target === target);

		if (index > -1) {
			targets[index].trigger();
		}
	}

	on = (type, target, trigger) => {
		if (!Array.isArray(this._eventHandlers[type])) {
			throw new Error('viewportObserver: method `on` get not correct event type');
		}

		this._eventHandlers[type].push({
			target,
			trigger,
		});

		return this;
	}

	observe = (target) => {
		this._observer.observe(target);
		return this;
	}

	unobserve = (target) => {
		if (!target) return;
		this._observer.unobserve(target);
		forOwn(this._eventHandlers, (v, key) => {
			const index = findIndex(this._eventHandlers[key], el => el.target === target);
			if (index > -1) this._eventHandlers[key].splice(index, 1);
		});
	}

	unobserveAll = () => {
		this._observer.disconnect();
		forOwn(this._eventHandlers, (v, key) => {
			this._eventHandlers[key].length = 0;
		});
	}
}

const viewportObserver = options => new ViewportObserver(options);

export default viewportObserver;
