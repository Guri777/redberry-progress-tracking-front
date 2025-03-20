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
    assignees: [],
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
    if (tempSelection.length > 0) {
      newParams.set(
        key,
        JSON.stringify(
          tempSelection.filter((selectedFields) =>
            (availableFilters as { [key: string]: string[] })[key].includes(
              selectedFields,
            ),
          ),
        ),
      );
    }
    navigate({ search: newParams.toString() }, { replace: true });

    handleCloseFilter();
  };

  const handleCheckboxChange = (value: string) => {
    if (tempSelection.includes(value)) {
      if (openFilter === 'assignees' || openFilter === 'assignee') {
        setTempSelection([]);
      } else setTempSelection((prev) => prev.filter((val) => val !== value));
    } else {
      if (openFilter === 'assignees' || openFilter === 'assignee') {
        setTempSelection([value]);
      } else setTempSelection((prev) => [...prev, value]);
    }
  };

  const filteredTasks = useMemo(() => {
    if (!data) return [];
    return data.filter((task) => {
      return (
        (!selectedFilters.department.length ||
          selectedFilters.department.some((department) =>
            department.includes(task.department.name),
          )) &&
        (!selectedFilters.priority.length ||
          selectedFilters.priority.some((priority) =>
            priority.includes(task.priority.name),
          )) &&
        (!selectedFilters.assignee.length ||
          selectedFilters.assignee.some((assignee) =>
            assignee.includes(task.employee.name),
          ))
      );
    });
  }, [data, selectedFilters]);
  const getAllSelectedValues = () => {
    return Object.values(selectedFilters)
      .flatMap((item) => item)
      .map((item) => {
        try {
          return Array.isArray(item) ? item : JSON.parse(item);
        } catch {
          return item;
        }
      })
      .flat();
  };
  const removeFilter = (filter: string) => {
    const urlParams = new URLSearchParams(window.location.search);

    const entries = Array.from(urlParams.entries());

    for (const [key, value] of entries) {
      try {
        let parsedArray: string[] = JSON.parse(value);

        if (Array.isArray(parsedArray)) {
          parsedArray = parsedArray.filter((item) => item !== filter);

          if (parsedArray.length > 0) {
            urlParams.set(key, JSON.stringify(parsedArray));
          } else {
            urlParams.delete(key);
          }
        }
      } catch (e) {
        continue;
      }
    }

    navigate({ search: urlParams.toString() }, { replace: true });
  };

  const removeAllFilters = () => {
    const newParams = new URLSearchParams();

    Object.keys(selectedFilters).forEach((key) => {
      selectedFilters[key as FilterKey] = [];
      newParams.delete(key);
    });

    navigate({ search: newParams.toString() }, { replace: true });
  };
  return {
    openFilter,
    anchorEl,
    tempSelection,
    selectedFilters,
    filteredTasks,
    allSelectedFilters: getAllSelectedValues(),
    availableFilters,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterChange,
    handleCheckboxChange,
    getAllSelectedValues,
    removeFilter,
    removeAllFilters,
  };
};
