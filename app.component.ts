import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { linesRessources, zooEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent,
  TimelineViewsService,
  TimelineMonthService,
  GroupModel,
  ViewsModel,
  View,
  EventSettingsModel,
  NavigatingEventArgs,
} from '@syncfusion/ej2-angular-schedule';
export const ressourcesList: any[] = [
  { id: 0, text: 'Cycle PO', color: '#AEB18A' },
  { id: 1, text: 'organisme', color: '#AEB18A' },
  { id: 2, text: 'nature', color: '#AEB18A' },
  { id: 3, text: 'cadre', color: '#AEB18A' },
  { id: 4, text: 'dominante', color: '#AEB18A' },
  { id: 5, text: 'posture', color: '#AEB18A' },
];

export const views: ViewsModel[] = [
  {
    option: 'TimelineDay',
    timeScale: { slotCount: 1 },
    allowVirtualScrolling: false,
  },
  {
    option: 'TimelineWeek',
    allowVirtualScrolling: false,
  },
  {
    option: 'TimelineMonth',
    allowVirtualScrolling: false,
  },
  {
    option: 'TimelineMonth',
    displayName: 'Quadrimestre',
    interval: 4,
    allowVirtualScrolling: false,
  },
  {
    option: 'TimelineMonth',
    displayName: 'Semestre',
    interval: 6,
    allowVirtualScrolling: false,
  },
  {
    option: 'TimelineMonth',
    displayName: 'Année',
    interval: 12,
    allowVirtualScrolling: false,
  },
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [TimelineViewsService, TimelineMonthService],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('schedule', { static: false })
  calendarObject: ScheduleComponent;
  public data: Object[] = <Object[]>extend([], zooEventsData, null, true);
  public selectedDate: Date = new Date('2022/09/1');
  public linesRessources: any[] = linesRessources;
  public group: GroupModel = {
    resources: ['lines'],
  };
  public readonly views: ViewsModel[] = views;
  public currentView: View = 'TimelineMonth';
  public calendarName: string = null;
  public calendarHeight: number = null;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    ignoreWhitespace: true,
  };
  ngOnInit(): void {
    this.calendarHeight = this.getDispoHeight();
  }
  ngAfterViewInit(): void {
    console.log(this.calendarObject);
  }
  public onNavigating(event: NavigatingEventArgs): void {}
  private getDispoHeight(): number {
    const clientHeight = window.innerHeight;
    const scheduleBorder = 1;
    const headerHeight = 70;
    const scheduleHeight = clientHeight - headerHeight - scheduleBorder;
    return scheduleHeight;
  }

  onDataBound() {
    console.log(this.calendarObject.getCurrentViewDates());
  }
}
