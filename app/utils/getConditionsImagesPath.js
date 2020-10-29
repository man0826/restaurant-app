export const getConditionsImagesPath = (code) => {
  switch (code) {
    case "buffet":
      return require("../../assets/img/conditions/buffet.jpg");
    case "bottomless_cup":
      return require("../../assets/img/conditions/bottomless_cup.jpg");
    case "lunch":
      return require("../../assets/img/conditions/lunch.jpg");
    case "private_room":
      return require("../../assets/img/conditions/private_room.jpg");
    case "midnight":
      return require("../../assets/img/conditions/midnight.jpg");
    case "parking":
      return require("../../assets/img/conditions/parking.jpg");
    case "kids_menu":
      return require("../../assets/img/conditions/kids_menu.jpg");
    case "sports":
      return require("../../assets/img/conditions/sports.jpg");
    case "deliverly":
      return require("../../assets/img/conditions/deliverly.jpg");
    case "breakfast":
      return require("../../assets/img/conditions/breakfast.jpg");
    case "with_pet":
      return require("../../assets/img/conditions/with_pet.jpg");
    case "until_morning":
      return require("../../assets/img/conditions/until_morning.jpg");
    case "takeout":
      return require("../../assets/img/conditions/takeout.jpg");
    case "sunday_open":
      return require("../../assets/img/conditions/sunday_open.jpg");
    case "card":
      return require("../../assets/img/conditions/card.jpg");
    case "no_smoking":
      return require("../../assets/img/conditions/no_smoking.jpg");
    case "wifi":
      return require("../../assets/img/conditions/wifi.jpg");
    case "bento":
      return require("../../assets/img/conditions/bento.jpg");
    default:
      return require("../../assets/img/no-image.png");
  }
};
