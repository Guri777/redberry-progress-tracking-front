export const BOARD_COLUMN_COLORS: Record<string, string> = {
  დასაწყები: 'var(--board-column-to-do)',
  პროგრესში: 'var(--board-column-progress)',
  'მზად ტესტირებისთვის': 'var(--board-column-ready-to-test)',
  დასრულებული: 'var(--board-column-completed)',
};

export const DEPARTMENT_COLORS: Record<string, string> = {
  'ადმინისტრაციის დეპარტამენტი': 'var(--department-admin)',
  'ადამიანური რესურსების დეპარტამენტი': 'var(--department-human-resources)',
  'ფინანსების დეპარტამენტი': 'var(--department-finance)',
  'გაყიდვები და მარკეტინგის დეპარტამენტი': 'var(--department-sales-marketing)',
  'ლოჯოსტიკის დეპარტამენტი': 'var(--department-logistics)',
  'ტექნოლოგიების დეპარტამენტი': 'var(--department-technology)',
  'მედიის დეპარტამენტი': 'var(--department-media)',
};

export const STATUS_ICON_COLORS: Record<string, string> = {
  დაბალი: 'var(--status-low)',
  საშუალო: 'var(--status-medium)',
  მაღალი: 'var(--status-high)',
};

export type FilterKey =
  | 'department'
  | 'assignee'
  | 'priority'
  | 'departments'
  | 'assignee'
  | 'priorities';

export const FILTER_GEORGIAN_LABELS = {
  departments: 'დეპარტამენტენი',
  priorities: 'პრიორიტეტი',
  assignees: 'თანამშრომელი',
  department: 'დეპარტამენტენი',
  priority: 'პრიორიტეტი',
  assignee: 'თანამშრომელი',
};
