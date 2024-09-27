"""Todo API"""

from fastapi import APIRouter, Depends

from ..services import TodoService
from ..models.todo_item import TodoItem
from ..api.authentication import registered_user
from ..models.user import User

__authors__ = ["Ajay Gandecha"]
__copyright__ = "Copyright 2024"
__license__ = "MIT"

api = APIRouter(prefix="/api/todo")
openapi_tags = {
    "name": "Todo",
    "description": "Create, update, delete, and retrieve todo items.",
}


@api.get("", response_model=list[TodoItem], tags=["Todo"])
def get_todos(
    todo_service: TodoService = Depends(),
    subject: User = Depends(registered_user),
) -> list[TodoItem]:
    """API to get all todo items."""
    return todo_service.all(subject)


# TODO: Create a POST API that enables users to create todo list items.
# Requests to this API should include a request body matching the
# Pydantic model type `TodoItem`.
#
# Hint: Inject the `TodoService` into your API method, like shown in the
# `get_todos` function. Use the `TodoService.create(subject, item)` method
# to complete the creation operation.
#
# This API should respond with the created `TodoItem` to the frontend once called.
#
# Your solution below:
...


# TODO: Create a PUT API that enables users to toggle todo list items.
# Requests to this API should include a request body matching the
# Pydantic model type `TodoItem`.
#
# Hint: Inject the `TodoService` into your API method, like shown in the
# `get_todos` function. Use the `TodoService.toggle_checkmark(subject, item)`
# method to complete this operation.
#
# This API should respond with the edited `TodoItem` to the frontend once called.
#
# Your solution below:
...

# TODO: Create a DELETE API that enables users to delete a todo list item.
# Requests to this API should include a request body matching the
# Pydantic model type `TodoItem`.
#
# Hint: Inject the `TodoService` into your API method, like shown in the
# `get_todos` function. Use the `TodoService.delete(subject, item)`
# method to complete this operation.
#
# This API should not respond with any data to the frontend once called.
#
# Your solution below:
...