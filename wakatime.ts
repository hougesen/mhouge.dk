export type WakatimeStatResponse = {
  data: {
    categories: Array<{
      decimal: string;
      digital: string;
      hours: number;
      minutes: number;
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    }>;
    daily_average: number;
    daily_average_including_other_language: number;
    days_including_holidays: number;
    days_minus_holidays: number;
    editors: Array<{
      decimal: string;
      digital: string;
      hours: number;
      minutes: number;
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    }>;
    holidays: number;
    human_readable_daily_average: string;
    human_readable_daily_average_including_other_language: string;
    human_readable_range: string;
    human_readable_total: string;
    human_readable_total_including_other_language: string;
    id: string;
    is_already_updating: boolean;
    is_cached: boolean;
    is_coding_activity_visible: boolean;
    is_including_today: boolean;
    is_other_usage_visible: boolean;
    is_stuck: boolean;
    is_up_to_date: boolean;
    is_up_to_date_pending_future: boolean;
    languages: Array<{
      decimal: string;
      digital: string;
      hours: number;
      minutes: number;
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    }>;
    operating_systems: Array<{
      decimal: string;
      digital: string;
      hours: number;
      minutes: number;
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    }>;
    percent_calculated: number;
    range: string;
    status: string;
    timeout: number;
    total_seconds: number;
    total_seconds_including_other_language: number;
    user_id: string;
    username: string;
    writes_only: boolean;
  };
};
