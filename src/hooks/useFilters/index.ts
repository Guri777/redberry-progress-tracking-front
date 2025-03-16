import { useState, useMemo, MouseEvent, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FilterKey } from '@/utils/consts';
import { Task } from '@/types';
export const useFilters = (data: Task[] | undefined) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tempSelection, setTempSelection] = useState<string[]>([]);

  const selectedFilters: Record<FilterKey, string[]> = {
    department: searchParams.getAll('departments') || [],
    priority: searchParams.getAll('priorities') || [],
    assignee: searchParams.getAll('assignees') || [],
    departments: [],
    priorities: [],
  };

  const availableFilters = useMemo(() => {
    if (!data) return { departments: [], priorities: [], assignees: [] };

    const departments = Array.from(
      new Set(data.map((task) => task.department.name)),
    );
    const priorities = Array.from(
      new Set(data.map((task) => task.priority.name)),
    );
    const assignees = Array.from(
      new Set(data.map((task) => task.employee.name)),
    );

    return { departments, priorities, assignees };
  }, [data]);

  useEffect(() => {
    if (!openFilter) return;
    setTempSelection([...searchParams.getAll(openFilter)]);
  }, [openFilter]);

  const handleOpenFilter = (
    event: MouseEvent<HTMLButtonElement>,
    filterKey: FilterKey,
  ) => {
    setAnchorEl(event.currentTarget);
    setOpenFilter(filterKey);
  };

  const handleCloseFilter = () => {
    setOpenFilter(null);
    setAnchorEl(null);
  };

  const handleFilterChange = (key: FilterKey) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    tempSelection.forEach((value) => newParams.append(key, value));
    navigate({ search: newParams.toString() }, { replace: true });
    handleCloseFilter();
  };

  const handleCheckboxChange = (value: string) => {
    setTempSelection((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const filteredTasks = useMemo(() => {
    if (!data) return [];
    return data.filter((task) => {
      return (
        (!selectedFilters.department.length ||
          selectedFilters.department.includes(task.department.name)) &&
        (!selectedFilters.priority.length ||
          selectedFilters.priority.includes(task.priority.name)) &&
        (!selectedFilters.assignee.length ||
          selectedFilters.assignee.includes(task.employee.name))
      );
    });
  }, [data, selectedFilters]);

  return {
    openFilter,
    anchorEl,
    tempSelection,
    selectedFilters,
    filteredTasks,
    availableFilters,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterChange,
    handleCheckboxChange,
  };
};
