import { Component, OnInit, ViewChild } from '@angular/core';
import { linesRessources, zooEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
  ViewsModel,
  GroupModel,
  View,
  ScheduleComponent,
  TimelineViewsService,
  TimelineMonthService,
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
  providers: [
    TimelineViewsService,
    TimelineMonthService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService,
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('schedule', { static: false })
  calendarObject: ScheduleComponent;

  public selectedDate: Date = new Date('2022/09/1');
  public linesRessources: any[] = [];
  public group: GroupModel = {
    resources: ['lines'],
  };
  public readonly views: ViewsModel[] = views;
  public currentView: View = 'TimelineMonth';
  public calendarName: string = null;
  public calendarHeight: number = null;
  public eventSettings: EventSettingsModel = {
    dataSource: [...zooEventsData],
    ignoreWhitespace: true,
  };
  ngOnInit(): void {
    this.calendarHeight = this.getDispoHeight();
    this.linesRessources = linesRessources;
    this.eventSettings.dataSource = zooEventsData;
    this.calendarObject.refresh();
  }
  public onNavigating(event: NavigatingEventArgs): void {
    this.updateHeaderRows(event.currentView, event.viewIndex);
  }
  private updateHeaderRows(currentView: string, viewIndex: number): void {
    switch (currentView) {
      case 'TimelineDay':
        this.calendarObject.headerRows = [
          { option: 'Date' },
          { option: 'Hour' },
        ];
        break;

      case 'TimelineWeek':
        this.calendarObject.headerRows = [
          { option: 'Week' },
          { option: 'Date' },
        ];
        break;

      case 'TimelineMonth':
        if (viewIndex === 5) {
          this.calendarObject.headerRows = [
            { option: 'Year' },
            { option: 'Month' },
          ];
        } else {
          this.calendarObject.headerRows = [
            { option: 'Month' },
            { option: 'Week' },
          ];
        }
        break;
    }
  }
  private getDispoHeight(): number {
    const clientHeight = window.innerHeight;
    const scheduleBorder = 1;
    const headerHeight = 70;
    const scheduleHeight = clientHeight - headerHeight - scheduleBorder;
    return scheduleHeight;
  }
}
