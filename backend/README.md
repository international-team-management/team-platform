### Менеджер зависимостей Poetry

pip install --upgrade pip

pip install poetry

#### Чтобы установить все зависимости и запустить виртуальное окружение выполните:
poetry env use python3.9

poetry install

poetry shell

#### Чтобы установить зависимости, кроме необходимых для тестирования: 

poetry install --without test

### Прочее


- Кавычки: одинарные

- Ширина строки: 120


### Пул-реквесты


 1. В разделе **Pull requests** перейти по ссылке [New Pull request](https://github.com/international-team-management/team-platform/pulls)
 2. В меню **base** выбрать `backend {command} / {type} / {branch_name}`
 3. В меню **compare** выбрать `backend`
 4. Нажать **Create pull request**
 5. На странице пул реквеста справа сверху в блоке **Reviewers** добавить двух ревьюверов (cross-review)
 6. В название пул реквеста скопировать название задачи (если задача выполнена частично, то вкратце перечислить, что сделано)
 7. На странице таска слинковать пулл реквест и таск.