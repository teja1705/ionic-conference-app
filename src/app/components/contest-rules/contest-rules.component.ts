import { Component, OnInit } from '@angular/core';
import { ODI_BAT_SCORE_RANGE, ODI_BOWL_WICKET_RANGE, ODI_TEAM_SCORE_RANGE, T20_BAT_SCORE_RANGE, T20_BOWL_WICKET_RANGE, T20_TEAM_SCORE_RANGE, TEST_BAT_SCORE_RANGE, TEST_BOWL_WICKET_RANGE, TEST_TEAM_SCORE_RANGE } from '../../store/prediction.model';

@Component({
  selector: 'app-contest-rules',
  templateUrl: './contest-rules.component.html',
  styleUrls: ['./contest-rules.component.scss'],
})
export class ContestRulesComponent implements OnInit {

  t20_bat = T20_BAT_SCORE_RANGE
  t20_bowl = T20_BOWL_WICKET_RANGE
  t20_team = T20_TEAM_SCORE_RANGE

  odi_bat = ODI_BAT_SCORE_RANGE
  odi_bowl = ODI_BOWL_WICKET_RANGE
  odi_team = ODI_TEAM_SCORE_RANGE

  test_bat = TEST_BAT_SCORE_RANGE
  test_bowl = TEST_BOWL_WICKET_RANGE
  test_team = TEST_TEAM_SCORE_RANGE

  constructor() { }

  ngOnInit() {}

}
