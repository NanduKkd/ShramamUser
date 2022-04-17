const monthDays = (year,month) => [31,isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31][month];
const isLeapYear = year => (year%100===0?year%400:year%4)===0;

export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

export const weekShortNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export const getMonthCalenderArr = (month, year) => {
	const monthStart = new Date(year,month,1);
	const monthLength = monthDays(year, month);
	const monthEnd = new Date(year,month,monthLength)
	const day1 = monthStart.getDay();
	const weekGap = (day1+monthLength)/7;
	const lastMonthLength = monthDays(month===0?year-1:year, month===0?11:month-1);
	const arr = [];
	for(let i=0; i<weekGap; i++) {
		arr.push([]);
		for(let j=0; j<7; j++) {
			const d = i*7+j;
			arr[i].push(d-day1+1<1?[month===0?year-1:year,month===0?11:month-1,lastMonthLength-day1+d+1]:d-day1<monthLength?[year,month,d-day1+1]:[month===11?year+1:year,month===11?0:month+1,d-monthLength-day1+1])

		}
	}
	return arr;
}

export function dayDifference(d1=new Date(), d2=new Date()) {
	return Math.floor((5.5*3600000+d1.getTime())/(24*3600000))-Math.floor((5.5*3600000+d2.getTime())/(24*3600000))
}
