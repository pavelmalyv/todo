# ToDo

ToDo — демонстрационное SPA-приложение для управления задачами с тегами и обновлением данных в реальном времени. Создано для демонстрации навыков работы с React, TypeScript, роутингом, авторизацией и внешним API.

## Возможности

- Создание, редактирование, удаление задач
- Назначение даты и времени выполнения
- Теги: добавление, редактирование, удаление
- Реактивные обновления через подписки Firestore
- Просмотр задач:
  - ближайшие дни (дашборд)
  - любой день (календарь)
- Базовая доступность (a11y)

## Стек

- **Язык и фреймворк:** React, TypeScript
- **Бэкенд:** Firebase (Firestore, Auth)
- **Сборка и линтеры:** Vite, ESLint, Stylelint, Prettier
- **Утилиты:** React Hook Form, React Router, YUP, Lodash, Immer и др.
- **Стили:** SCSS, CSS Modules

## Архитектура

- **Логика и представление разделены**
- **Кастомные хуки**
  - `hooks/data` — инкапсулируют работу с Firebase, управляют состояниями загрузки/ошибок
  - `hooks/ui` — хуки для управления визуальным состоянием
- **Compound components** с передачей данных через React Context

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Ограничения демо-версии

- Нет серверной логики (Cloud Functions), часть операций реализованы компромиссно на клиенте
- Реализован минимально необходимый функционал без расширенных сценариев использования

## Демо

Проект доступен по адресу:
https://pavelmalyv.github.io/todo/

## Для кого

Демонстрационный проект, не предназначен для продакшн-использования.
