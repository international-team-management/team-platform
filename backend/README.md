### Менеджер зависимостей Poetry

pip install --upgrade pip

pip install poetry

### Линтеры

poetry add pytest flake8 pep8-naming flake8-broken-line flake8-return flake8-isort mypy black isort

### Pre-commit hooks

- Создаем и открываем файл: `touch .git/hooks/pre-commit`, `nano .git/hooks/pre-commit`
- Файл должен быть исполняемым: `chmod +x .git/hooks/pre-commit`
- Если `mypy` ругается на внутренние импорты Django, а все остальное правильно, можно сделать коммит с ключом `--no-verify` (нежелательно): `git commit --no-verify -m 'commit message'`

```
#!/bin/bash
for file in $(git diff --diff-filter=d --cached --name-only | grep -E '\.py$')
do
  git show ":$file" | black -l 120 "$file"
  
  git show ":$file" | isort -e -m 4 -w 120 --profile black "$file"
  
  git show ":$file" | flake8 --format='%(path)s:%(row)d,%(col)d:%(code)s:%(text)s:https://lintlyci.github.io/Flake8Rules/rules/%(code)s.html' "$file"
  if [ $? -ne 0 ]; then
    echo "flake8 failed on '$file'."
    exit 1
  fi
  git show ":$file" | mypy "$file"
  if [ $? -ne 0 ]; then
    echo "mypy failed on '$file'."
    exit 1
  fi
done
```


### Прочее


- Кавычки: двойные

- Ширина строки: 120


### Пул-реквесты


 1. В разделе **Pull requests** перейти по ссылке [New Pull request](https://github.com/international-team-management/team-platform/pulls)
 2. В меню **base** выбрать `backend`
 3. В меню **compare** выбрать `develop`
 4. Нажать **Create pull request**
 5. На странице пул реквеста справа сверху в блоке **Reviewers** добавить двух ревьюверов (cross-review)
 6. В название пул реквеста скопировать название задачи (если задача выполнена частично, то вкратце перечислить, что сделано)
 7. На странице таска слинковать пулл реквест и таск.

