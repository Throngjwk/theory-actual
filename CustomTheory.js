import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "my_custom_theory_id";
var name = "My Custom Theory";
var description = "A basic theory.";
var authors = "Gilles-Philippe Paillé";
var version = 1;

var currency;
var c1, c2;
var c1Exp, c2Exp;

var achievement1, achievement2;
var chapter1, chapter2;

var prestige_points = 0;
var day;
var prestige_cost;
var prestige_cost_cases = [
  BigNumber.from("4.22e7"),
  BigNumber.from("1.77e17"),
  BigNumber.from("5.56e24"),
  BigNumber.from("1.18e36"),
  BigNumber.from("5.52e43"),
  BigNumber.from("1.57e51"),
  BigNumber.from("6.22e58"),
  BigNumber.from("2.09e61"),
  BigNumber.from("4.57e69"),
  BigNumber.from("2.23e75"),
  BigNumber.from("1.09e79"),
  BigNumber.from("8.82e85"),
  BigNumber.from("9.09e90"),
  BigNumber.from("2.09e96"),
  BigNumber.from("1.01e101"),
  BigNumber.from("4.33e108"),
  BigNumber.from("1.16e113"),
  BigNumber.from("9.22e123"),
  BigNumber.from("5.55e130"),
  BigNumber.from("2.56e134"),
  BigNumber.from("6.22e140"),
  BigNumber.from("5.09e149"),
  BigNumber.from("2.22e155"),
  BigNumber.from("1.09e166"),
  BigNumber.from("3.36e170"),
  BigNumber.from("4.89e177"),
]

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(10)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e10);
    theory.createBuyAllUpgrade(1, currency, 1e13);
    theory.createAutoBuyerUpgrade(2, currency, 1e30);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Achievement 1", "Description 1", () => c1.level > 1);
    achievement2 = theory.createSecretAchievement(1, "Achievement 2", "Description 2", "Maybe you should buy two levels of c2?", () => c2.level > 1);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My First Chapter", "This is line 1,\nand this is line 2.\n\nNice.", () => c1.level > 0);
    chapter2 = theory.createStoryChapter(1, "My Second Chapter", "This is line 1 again,\nand this is line 2... again.\n\nNice again.", () => c2.level > 0);

    updateAvailability();

    switch (Date.now().getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
         break;
        case 5:
          day = "Friday";
          break;
        case  6:
         day = "Saturday";
    }

    switch (prestige_points) {
      case 0:
       prestige_cost = prestige_cost_cases[0]
       break;
      case 1:
        prestige_cost = prestige_cost_cases[1]
        break;
      case 2:
        prestige_cost = prestige_cost_cases[2]
        break;
        case 3:
          prestige_cost = prestige_cost_cases[3]
          break;
        case 4:
        prestige_cost = prestige_cost_cases[4]
        break;
        case 5:
        prestige_cost = prestige_cost_cases[5]
        break;
        case 6:
        prestige_cost = prestige_cost_cases[6]
        break;
        case 7:
        prestige_cost = prestige_cost_cases[7]
        break;
        case 8:
        prestige_cost = prestige_cost_cases[8]
        break;
        case 9:
        prestige_cost = prestige_cost_cases[9]
        break;
        case 10:
        prestige_cost = prestige_cost_cases[10]
        break;
        case 11:
        prestige_cost = prestige_cost_cases[11]
        break;
        case 12:
        prestige_cost = prestige_cost_cases[12]
        break;
        case 13:
        prestige_cost = prestige_cost_cases[13]
        break;
        case 14:
        prestige_cost = prestige_cost_cases[14]
        break;
        case 15:
        prestige_cost = prestige_cost_cases[15]
        break;
        case 16:
        prestige_cost = prestige_cost_cases[16]
        break;
        case 17:
        prestige_cost = prestige_cost_cases[17]
        break;
        case 18:
        prestige_cost = prestige_cost_cases[18]
        break;
        case 19:
        prestige_cost = prestige_cost_cases[19]
        break;
        case 20:
        prestige_cost = prestige_cost_cases[20]
        break;
        case 21:
        prestige_cost = prestige_cost_cases[21]
        break;
        case 22:
        prestige_cost = prestige_cost_cases[22]
        break;
        case 23:
        prestige_cost = prestige_cost_cases[23]
        break;
        case 24:
        prestige_cost = prestige_cost_cases[24]
        break;
        case 25:
        prestige_cost = prestige_cost_cases[25]
        break;
    }
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getC1(c1.level).pow(getC1Exponent(c1Exp.level)) *
                                   getC2(c2.level).pow(getC2Exponent(c2Exp.level));
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

    if (c2Exp.level == 1) result += "^{1.05}";
    if (c2Exp.level == 2) result += "^{1.1}";
    if (c2Exp.level == 3) result += "^{1.15}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);

init();
