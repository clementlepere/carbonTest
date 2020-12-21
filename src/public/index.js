// var treasureHuntService = require('../back/infra/services/treasureHuntService')
import treasureHuntService from './treasureHuntService/treasureHuntService';
console.log('index test');

const service = new treasureHuntService.huntForTreasures();