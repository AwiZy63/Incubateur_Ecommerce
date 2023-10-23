'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'ASUS Zenbook 13 OLED',
        price: 1299.99,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/819rX9JIgML._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71RHviFuxtL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/715zlwIRbrL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71mluYrDhML._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61Q-9MfHfrL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61xoaMoO3bL._AC_SX679_.jpg"
        ]),
        description: 'Un ultrabook de 13 pouces avec un écran OLED 16:10, un processeur Intel Core i7-1165G7, 16 Go de RAM et un SSD de 512 Go.',
        category: 'laptops',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HP Pavilion Gaming',
        price: 323.53,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/51yXOtKkHVL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/41RSNtB2DlL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/41ok4whtK0L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/512zzwLKiZL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/51d9Q3VPgNL._AC_SX679_.jpg"
        ]),
        description: 'PC de bureau pour le gaming avec un processeur Intel i5, 16 Go de RAM et 1 To de HDD.',
        category: 'desktops',
        stock: 36,
        createdAt: new Date('2023-10-20T13:05:59.093283'),
        updatedAt: new Date('2023-10-20T13:05:59.093291'),
      },
      {
        name: 'Dell Inspiron',
        price: 348.34,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/61nHt5NyrvL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "https://m.media-amazon.com/images/I/61o5NKzsipL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/710r7Pwoa9L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61wwjJN58XL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61WZjQW1DbL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/710cJDva8ML._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61BwthOP0XL._AC_SX679_.jpg"
        ]),
        description: 'PC de bureau polyvalent pour la famille avec un processeur Intel i3, 8 Go de RAM et 512 Go de SSD.',
        category: 'desktops',
        stock: 22,
        createdAt: new Date('2023-10-20T13:05:59.093304'),
        updatedAt: new Date('2023-10-20T13:05:59.093306'),
      },
      {
        name: 'Acer Aspire',
        price: 303.66,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/41dnOagDqcL._AC_.jpg",
          "https://m.media-amazon.com/images/I/418VAHn7sEL._AC_.jpg",
          "https://m.media-amazon.com/images/I/41SOLb-4--L._AC_.jpg",
          "https://m.media-amazon.com/images/I/51aWuBQpruL._AC_.jpg"
        ]),
        description: 'Un PC de bureau élégant pour le travail quotidien avec un processeur Intel i7, 16 Go de RAM et 1 To de SSD.',
        category: 'desktops',
        stock: 6,
        createdAt: new Date('2023-10-20T13:05:59.093313'),
        updatedAt: new Date('2023-10-20T13:05:59.093314'),
      },
      {
        name: 'ASUS Zenbook Pro',
        price: 1426.59,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/71HUZ5wzfzL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71vMg3BUvXL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71umTBckvJL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71UriWnTc3L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61OM8BZM8kL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/51flh1lELdL._AC_SX679_.jpg"
        ]),
        description: 'Ultrabook de 15 pouces avec un écran 4K, un processeur Intel i7, 32 Go de RAM et un SSD de 1 To.',
        category: 'laptops',
        stock: 8,
        createdAt: new Date('2023-10-20T13:05:59.093321'),
        updatedAt: new Date('2023-10-20T13:05:59.093323'),
      },
      {
        name: 'Lenovo ThinkPad',
        price: 1536.37,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/51ZT5KPa6RL.__AC_SX300_SY300_QL70_ML2_.jpg"
        ]),
        description: 'Ordinateur portable robuste pour les professionnels avec un processeur Intel i5, 16 Go de RAM et un SSD de 512 Go.',
        category: 'laptops',
        stock: 33,
        createdAt: new Date('2023-10-20T13:05:59.093329'),
        updatedAt: new Date('2023-10-20T13:05:59.093331'),
      },
      {
        name: 'Apple MacBook Air',
        price: 1398.34,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/81Fm0tRFdHL.__AC_SY445_SX342_QL70_ML2_.jpg",
          "https://m.media-amazon.com/images/I/71GiYRiqYgL._AC_SX522_.jpg",
          "https://m.media-amazon.com/images/I/81gCQWjdORL._AC_SX522_.jpg",
          "https://m.media-amazon.com/images/I/818AM20n+EL._AC_SX522_.jpg",
          "https://m.media-amazon.com/images/I/91RP9XTkeRL._AC_SX522_.jpg",
          "https://m.media-amazon.com/images/I/71jYbxReGqL._AC_SX522_.jpg"
        ]),
        description: 'Léger et puissant avec un écran Retina, un processeur M1, 8 Go de RAM et 256 Go de SSD.',
        category: 'laptops',
        stock: 38,
        createdAt: new Date('2023-10-20T13:05:59.093336'),
        updatedAt: new Date('2023-10-20T13:05:59.093338'),
      },
      {
        name: 'LG Ultrawide',
        price: 1844.56,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/61MWJW4UT9L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61nB6Y8QJvL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61smKLBr-xL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61oWoOksTgL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/41ZQAdDX70L._AC_SX679_.jpg"
        ]),
        description: 'Écran ultra-large de 34 pouces avec une résolution de 3440x1440, idéal pour le multitâche.',
        category: 'screens',
        stock: 5,
        createdAt: new Date('2023-10-20T13:05:59.093344'),
        updatedAt: new Date('2023-10-20T13:05:59.093345'),
      },
      {
        name: 'Samsung QLED',
        price: 399.3,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/81LL4PGDdpL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81zUARD1oZL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/51ixdG8lDHL._AC_SY879_.jpg",
          "https://m.media-amazon.com/images/I/61IHZYRdrtL._AC_SY879_.jpg",
          "https://m.media-amazon.com/images/I/81G5qEnG+qL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71eJSTS6JYL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/51E869w8JQL._AC_SX679_.jpg"
        ]),
        description: 'Écran de 27 pouces avec technologie QLED offrant des couleurs vives et un contraste élevé.',
        category: 'screens',
        stock: 42,
        createdAt: new Date('2023-10-20T13:05:59.093351'),
        updatedAt: new Date('2023-10-20T13:05:59.093352'),
      },
      {
        name: 'Dell Ultrasharp',
        price: 370.23,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/6117ESiaa7L._AC_SX679_.jpg",
        ]),
        description: 'Écran de 24 pouces avec une résolution 4K pour les professionnels de la création.',
        category: 'screens',
        stock: 30,
        createdAt: new Date('2023-10-20T13:05:59.093358'),
        updatedAt: new Date('2023-10-20T13:05:59.093359'),
      },
      {
        name: 'Logitech G Pro',
        price: 1821.63,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/71ymAYjFNeL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61P4GtsmpkL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61gUEzpHrDL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61+mPb6lDeL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61emyosItnL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/618xA8q4iwL._AC_SX679_.jpg"
        ]),
        description: 'Clavier mécanique pour le gaming avec des touches rapides et un rétroéclairage RGB.',
        category: 'keyboards',
        stock: 16,
        createdAt: new Date('2023-10-20T13:05:59.093365'),
        updatedAt: new Date('2023-10-20T13:05:59.093367'),
      },
      {
        name: 'Corsair K70',
        price: 119.67,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/71dfUVJLQ-L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/91R0PFhhIoL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81MPFxh1xPL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81Zg6mZnq+L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81cXB-PayfL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81-ETkYV66L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71k+QxKGbSL._AC_SX679_.jpg"
        ]),
        description: 'Clavier robuste avec touches Cherry MX et rétroéclairage personnalisable.',
        category: 'keyboards',
        stock: 11,
        createdAt: new Date('2023-10-20T13:05:59.093372'),
        updatedAt: new Date('2023-10-20T13:05:59.093373'),
      },
      {
        name: 'Razer BlackWidow',
        price: 308.52,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/81L4FpeS3VL.__AC_SY300_SX300_QL70_ML2_.jpg",
          "https://m.media-amazon.com/images/I/710oLstGNFL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71hVdJjqxlL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81Xa-UaZK-L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/81zFig70q1L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71jDSL2x0DL._AC_SX679_.jpg"
        ]),
        description: 'Clavier mécanique avec une réponse rapide, idéal pour les joueurs compétitifs.',
        category: 'keyboards',
        stock: 20,
        createdAt: new Date('2023-10-20T13:05:59.093379'),
        updatedAt: new Date('2023-10-20T13:05:59.093380'),
      },
      {
        name: 'SteelSeries Rival',
        price: 42.27,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/61kbsiOjlpS._AC_SY879_.jpg",
          "https://m.media-amazon.com/images/I/61rYWL1TeUS._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/31iW7T5G2SS._AC_.jpg",
          "https://m.media-amazon.com/images/I/61xLMEut57S._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/61y1nt1glqS._AC_SX679_.jpg"
        ]),
        description: 'Souris ergonomique pour le gaming avec un capteur de 12000 DPI.',
        category: 'mice',
        stock: 12,
        createdAt: new Date('2023-10-20T13:05:59.093386'),
        updatedAt: new Date('2023-10-20T13:05:59.093387'),
      },
      {
        name: 'Logitech MX Master',
        price: 99.02,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/61xKiCADfpL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71z3quw6mtL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71AMmET2HpL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/619uMyw7JjL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/718rEkBZ1+L._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/7126J-1UEzL._AC_SX679_.jpg"
        ]),
        description: 'Souris sans fil pour les professionnels avec une longue autonomie de batterie.',
        category: 'mice',
        stock: 25,
        createdAt: new Date('2023-10-20T13:05:59.093393'),
        updatedAt: new Date('2023-10-20T13:05:59.093394'),
      },
      {
        name: 'Razer DeathAdder',
        price: 168.41,
        images: JSON.stringify([
          "https://m.media-amazon.com/images/I/71ohoFWDWYL.__AC_SX300_SY300_QL70_ML2_.jpg",
          "https://m.media-amazon.com/images/I/81DRVGXgPKL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71Qw4CXoZGL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71OAcdkwQvL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71hJigJZ0kL._AC_SX679_.jpg",
          "https://m.media-amazon.com/images/I/71cAtWwxJkL._AC_SX679_.jpg"
        ]),
        description: 'Souris pour le gaming avec un design confortable et un capteur précis.',
        category: 'mice',
        stock: 36,
        createdAt: new Date('2023-10-20T13:05:59.093400'),
        updatedAt: new Date('2023-10-20T13:05:59.093401'),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
