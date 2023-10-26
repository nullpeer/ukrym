import { getArtistIsUkr, isUkr } from "./funcs/isUkr";
import { checkByNick } from "./funcs/isUkr";

(async () => {
  console.log(await isUkr("Наконечний Северин"));
  console.log(await checkByNick("CLONNEX"));
  console.log(await checkByNick("Boulevard Depo"));
  console.log(await isUkr("Моргенштерн Алишер Тагирович"));
  await getArtistIsUkr(3879764);
})();
