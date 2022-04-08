import { Injectable } from '@angular/core';
import { getAnalytics, Analytics, logEvent } from "firebase/analytics";
import { getApp } from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly analyticsBase: Analytics;

  constructor() {
    const app = getApp();
    this.analyticsBase = getAnalytics(app);
  }

  public sendPageEvent(pageName: string, pageData: {[key: string]: any}): void {
    logEvent(this.analyticsBase, "page_view", {...pageData, page_title: pageName});
  }

  public sendClickEvent(eventName: string, eventData: {[key: string]: any}): void {
    logEvent(this.analyticsBase, eventName, eventData);
  }
}
