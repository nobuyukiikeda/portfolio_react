float toHill(float value) {
	value = clamp(value, 0.0, 1.0);
	return mix(value, 1.0 - value, step(0.5, value));
}
