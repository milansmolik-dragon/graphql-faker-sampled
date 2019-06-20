//import * as faker from 'faker';
const faker = require('faker');
import * as moment from 'moment';

export function getRandomInt(min:number, max:number) {
  return faker.random.number({min, max});
}

export function getRandomItem(array:any[]) {
  return array[getRandomInt(0, array.length - 1)];
}

class customError extends Error {
  statusCode: number
  constructor (name: string, statusCode: number, message?: string) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
}



export const typeFakers = {
  'Int': {
    defaultOptions: {min: 0, max: 99999},
    generator: (options) => {
      options.precision = 1;
      return () => faker.random.number(options);
    }
  },
  'Float': {
    defaultOptions: {min: 0, max: 99999, precision: 0.01},
    generator: (options) => {
      return () => faker.random.number(options);
    }
  },
  'String': {
    defaultOptions: {},
    generator: () => {
      return () => 'string';
    }
  },
  'Boolean': {
    defaultOptions: {},
    generator: () => {
      return () => faker.random.boolean();
    }
  },
  'ID': {
    defaultOptions: {},
    generator: () => {
      return (parentType) =>
        new Buffer(
          parentType.name + ':' + faker.random.number({max: 9999999999}).toString()
        ).toString('base64');
    }
  },
};

const fakeFunctions = {
  // Address section
  zipCode: () => faker.address.zipCode(),
  city: () => faker.address.city(),
  // Skipped: faker.address.cityPrefix
  // Skipped: faker.address.citySuffix
  streetName: () => faker.address.streetName(),
  streetAddress: {
    args: ['useFullAddress'],
    func: (useFullAddress) => faker.address.streetAddress(useFullAddress),
  },
  // Skipped: faker.address.streetSuffix
  // Skipped: faker.address.streetPrefix
  secondaryAddress: () => faker.address.secondaryAddress(),
  county: () => faker.address.county(),
  country: () => faker.address.country(),
  countryCode: () => faker.address.countryCode(),
  state: () => faker.address.state(),
  stateAbbr: () => faker.address.stateAbbr(),
  latitude: () => faker.address.latitude(),
  longitude: () => faker.address.longitude(),

  // Commerce section
  colorName: () => faker.commerce.color(),
  productCategory: () => faker.commerce.department(),
  productName: () => faker.commerce.productName(),
  money: {
    args: ['minMoney', 'maxMoney', 'decimalPlaces'],
    func: (min, max, dec) => faker.commerce.price(min, max, dec),
  },
  // Skipped: faker.commerce.productAdjective
  productMaterial: () => faker.commerce.productMaterial(),
  product: () => faker.commerce.product(),

  // Company section
  // Skipped: faker.company.companySuffixes
  companyName: () => faker.company.companyName(),
  // Skipped: faker.company.companySuffix
  companyCatchPhrase: () => faker.company.catchPhrase(),
  companyBs: () => faker.company.bs(),
  // Skipped: faker.company.catchPhraseAdjective
  // Skipped: faker.company.catchPhraseDescriptor
  // Skipped: faker.company.catchPhraseNoun
  // Skipped: faker.company.companyBsAdjective
  // Skipped: faker.company.companyBsBuzz
  // Skipped: faker.company.companyBsNoun

  // Database section
  dbColumn: () => faker.database.column(),
  dbType: () => faker.database.type(),
  dbCollation: () => faker.database.collation(),
  dbEngine: () => faker.database.engine(),

  // Date section
  pastDate: {
    args: ['dateFormat'],
    func: (dateFormat) => {
      const date = faker.date.past()
      return (dateFormat !== undefined ? moment(date).format(dateFormat) : date)
    }
  },
  futureDate: {
    args: ['dateFormat'],
    func: (dateFormat) => {
      const date = faker.date.future()
      return (dateFormat !== undefined ? moment(date).format(dateFormat) : date)
    }
  },
  recentDate: {
    args: ['dateFormat'],
    func: (dateFormat) => {
      const date = faker.date.recent()
      return (dateFormat !== undefined ? moment(date).format(dateFormat) : date)
    }
  },
  error: {
    args: ['name', 'code', 'message'],
    func: (name, code = 400, message = 'Panic!') => {throw new customError(name, code, message)}
  },
  // Finance section
  financeAccountName: () => faker.finance.accountName(),
  //TODO: investigate finance.mask
  financeTransactionType: () => faker.finance.transactionType(),
  currencyCode: () => faker.finance.currencyCode(),
  currencyName: () => faker.finance.currencyName(),
  currencySymbol: () => faker.finance.currencySymbol(),
  bitcoinAddress: () => faker.finance.bitcoinAddress(),
  internationalBankAccountNumber: () => faker.finance.iban(),
  bankIdentifierCode: () => faker.finance.bic(),

  // Hacker section
  hackerAbbr: () => faker.hacker.itAbbr(),
  hackerPhrase: () => faker.hacker.phrase(),

  // Image section
  imageUrl: {
    args: ['imageHeight', 'imageWidth', 'imageCategory', 'randomizeImageUrl'],
    func: (height, width, category, randomize) =>
      faker.image.imageUrl(height, width, category, randomize, false),
  },

  // Internet section
  avatarUrl: () => faker.internet.avatar(),
  email: {
    args: ['emailProvider'],
    func: (provider) => faker.internet.email(undefined, undefined, provider),
  },
  url: () => faker.internet.url(),
  domainName: () => faker.internet.domainName(),
  ipv4Address: () => faker.internet.ip(),
  ipv6Address: () => faker.internet.ipv6(),
  userAgent: () => faker.internet.userAgent(),
  colorHex: {
    args: ['baseColor'],
    func: ({red255, green255, blue255}) => {
      return faker.internet.color(red255, green255, blue255);
    },
  },
  macAddress: () => faker.internet.mac(),
  password: {
    args: ['passwordLenth'],
    func: (len) => faker.internet.password(len),
  },

  // Lorem section
  lorem: {
    args: ['loremSize'],
    func: (size) => faker.lorem[size || 'paragraphs'](),
  },

  // Name section
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  fullName: () => faker.name.findName(),
  jobTitle: () => faker.name.jobTitle(),

  // Phone section
  phoneNumber: () => faker.phone.phoneNumber(),
  // Skipped: faker.phone.phoneNumberFormat
  // Skipped: faker.phone.phoneFormats

  // Random section
  number: {
    args: ['minNumber', 'maxNumber', 'precisionNumber'],
    func: (min, max, precision) => faker.random.number({ min, max, precision }),
  },
  uuid: () => faker.random.uuid(),
  word: () => faker.random.word(),
  words: () => faker.random.words(),
  locale: () => faker.random.locale(),

  // System section
  // Skipped: faker.system.fileName
  // TODO: Add ext and type
  filename: () => faker.system.commonFileName(),
  mimeType: () => faker.system.mimeType(),
  // Skipped: faker.system.fileType
  // Skipped: faker.system.commonFileType
  // Skipped: faker.system.commonFileExt
  fileExtension: () => faker.system.fileExt(),
  semver: () => faker.system.semver(),
};

Object.keys(fakeFunctions).forEach(key => {
  var value = fakeFunctions[key];
  if (typeof fakeFunctions[key] === 'function')
    fakeFunctions[key] = {args: [], func: value};
});

export function fakeValue(type, options?, locale?) {
  const fakeGenerator = fakeFunctions[type];
  const argNames = fakeGenerator.args;
  //TODO: add check
  const callArgs = argNames.map(name => options[name]);

  const localeBackup = faker.locale;
  //faker.setLocale(locale || localeBackup);
  faker.locale = locale || localeBackup;
  const result = fakeGenerator.func(...callArgs);
  //faker.setLocale(localeBackup);
  faker.locale = localeBackup;
  return result;
}
