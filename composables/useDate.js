import moment from "moment";
import "moment/locale/es";

moment.locale("es");
export function useDate() {
  const fromNowDate = (date) => {
    return moment(date).fromNow();
  };

  return { fromNowDate };
}
