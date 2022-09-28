import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global

export const getCreatedDate = (date : string)=>{
    const day = new Date(date).getDate()
    const year = new Date(date).getFullYear()
    return day + ' ' + new Date(date).toLocaleString('default', { month: 'long' }) + ' ' + year
}
export const getEventDay = (date : string)=>{
    const day = new Date(date).getDate()
    return day + ' ' + new Date(date).toLocaleString('default', { month: 'short' })
}
export const getEventDate = (start: string, end : string)=>{
    
    const startDate = new Date(start) 
    const endDate = new Date(end)

    const startDay = startDate.getDate()
    const startYear = startDate.getFullYear()
    const startMonth = startDate.toLocaleString('default', { month: 'short' })
    const startTime = startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


    const endDay = endDate.getDate()
    const endMonth = endDate.toLocaleString('default', { month: 'short' })
    const endYear = endDate.getFullYear()
    const endTime = endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


    const sameDay = startDay === endDay && startMonth===endMonth && startYear===endYear
    if (sameDay) {
        return startMonth + ' ' + startDay +', ' + startYear +', ' + startTime + ' - ' + endTime 
    } 
    else{
        return startMonth + ' ' + startDay +', ' + startYear +', ' + startTime + '-' + startMonth + ' '
        + endDay +', ' + endYear +', ' + endTime
    }
    
}
export const dateSince = (date: string) => {
  
         const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
      
        let interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " " +  t("date.year");
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) +" " +  t("date.month");
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " " + t("date.day");
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " " +  t("date.hour");
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " " +  t("date.minute.short");
        }
        return Math.floor(seconds) + " " + t("date.second.short"); 
 }
      