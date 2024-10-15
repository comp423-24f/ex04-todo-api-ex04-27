/**
 * The To-Do Service abstracts business logic from the components.
 *
 * @author Ajay Gandecha, Jade Keegan
 * @copyright 2024
 * @license MIT
 */

import { Injectable, WritableSignal, signal } from '@angular/core';

import { ToDoListItem } from './todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /** Encapsulates a reactive list of to-do items. */
  todoList: WritableSignal<ToDoListItem[]> = signal([]);

  constructor(protected http: HttpClient) {}

  /**
   * Retrieves all of the todo items from the database.
   */
  getItems() {
    this.http.get<ToDoListItem[]>(`/api/todo`).subscribe({
      next: (items) => this.todoList.set(items),
      error: (err) => console.log(err)
    });
  }
  /**
   * Adds a new item to the to-do list.
   * @param item: Item to add to the to-do list.
   */
  addItem(title: string) {
    // Create the new item object and store it in a variable.
    const newItem: ToDoListItem = {
      id: null, // Note: This can be left as null - the backend will take care of this for us.
      title: title,
      completed: false
    };

    this.http
      .post<ToDoListItem>(`api/todo`, newItem)
      .subscribe((item) => this.todoList.update((todos) => [...todos, item]));
  }

  /**
   * Updates an item by check marking it.
   * @param item: Item to toggle the checkmark status for.
   */
  toggleItemCheckmark(item: ToDoListItem) {
    this.http
      .put<ToDoListItem>(`api/todo`, item)
      .subscribe((item) =>
        this.todoList.update((todos) => [
          ...todos.filter((todo) => todo.id !== item.id),
          item
        ])
      );
  }

  /**
   *Add new method to update an items title usingnew put method in todo.py
   * @param item: Item to update title
   */

  updateItemTitle(item: ToDoListItem, title: String) {
    this.http
      .put<ToDoListItem>(`api/todo/${title}`, item)
      .subscribe((item) =>
        this.todoList.update((todos) => todos.map((i) => i.id === item.id ? item : i))
      );
  }

  /**
   * Deletes an item from the to-do list.
   * @param item:  Item to delete.
   */
  deleteItem(item: ToDoListItem) {
    this.http
      .delete(`api/todo/${item.id}`)
      .subscribe(() =>
        this.todoList.update((todos) => [
          ...todos.filter((todo) => todo.id !== item.id)
        ])
      );
  }
}
