class ScrollObserver {
	constructor(options) {
		const opts = options || {};
		this._observer = new IntersectionObserver(this.handleObserve, {
			rootMargin: opts.rootMargin || '0px',
			threshold: opts.threshold || 0,
		});
		this._eventHandlers = {};
	}

	handleObserve = (entries) => {
		entries.forEach((entry) => {
			const { intersectionRatio } = entry;

			if (intersectionRatio === 1) this.emit('full-enter');
			if (intersectionRatio > 0) this.emit('enter');
			if (intersectionRatio < 1) this.emit('leave');
		});
	};

	observe = (target) => {
		this._observer.observe(target);
		return this;
	}

	on = (eventName, callback) => {
		this._eventHandlers[eventName] = callback;
		return this;
	};

	unobserve = (target) => {
		this._observer.unobserve(target);
	}

	unobserveAll = () => {
		this._observer.disconnect();
	};

	emit(eventName) {
		const handler = this._eventHandlers[eventName];

		if (handler) handler();
	}

	destroy() {
		this._observer.disconnect();
	}
}

const scrollObserver = options => new ScrollObserver(options);

export default scrollObserver;
