function dateFormat(dtStr) {
	const dt = new Date(dtStr);
	const y = dt.getFullYear();
	const m = padZero(dt.getMonth() + 1);
	const d = padZero(dt.getDay());
	const hh = padZero(dt.getHours());
	const mm = padZero(dt.getMinutes());
	const ss = padZero(dt.getSeconds());
	return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}
function padZero(m) {
	return m > 9 ? m : '0' + m;
}
module.exports = {
	dateFormat
};
