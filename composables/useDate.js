import moment from "moment";
import "moment/locale/es";

moment.locale("es");
export function useDate() {
  const fromNowDate = (date) => {
    console.log(moment.locale());
    return moment(date).fromNow();
  };

  return { fromNowDate };
}
