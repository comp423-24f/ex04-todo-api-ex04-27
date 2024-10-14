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


@api.post("", response_model=TodoItem, tags=["Todo"])
def new_todo(
    item: TodoItem,
    todo_service: TodoService = Depends(),
    subject: User = Depends(registered_user),
) -> TodoItem:
    """API to create a new todo item."""
    return todo_service.create(subject, item)


@api.put("", response_model=TodoItem, tags=["Todo"])
def toggle_checkmark(
    item: TodoItem,
    todo_service: TodoService = Depends(),
    subject: User = Depends(registered_user),
) -> TodoItem:
    """API to update a todo item's completion status."""
    return todo_service.toggle_checkmark(subject, item)


@api.delete("/{id}", response_model=None, tags=["Todo"])
def delete_todo(
    id: int,
    todo_service: TodoService = Depends(),
    subject: User = Depends(registered_user),
) -> None:
    """API to delete a todo item."""
    todo_service.delete(subject, id)


@api.put("/{title}", response_model=TodoItem, tags=["Todo"])
def update_title(
    item: TodoItem,
    title: str,
    todo_service: TodoService = Depends(),
    subject: User = Depends(registered_user),
) -> TodoItem:
    """API to update the title of a todo item."""
    return todo_service.update_title(subject, item, title)
