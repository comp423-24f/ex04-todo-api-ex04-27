/**
 * The Todo Page Component displays the user's todo list, and allows
 * users to create and delete to-do list items.
 *
 * @author Ajay Gandecha, Jade Keegan
 * @copyright 2024
 * @license MIT
 */

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../todo.service';
import { ToDoListItem } from '../todo.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  /** Route information to be used in To-Do Routing Module */
  public static Route = {
    path: '',
    title: 'My To-Dos',
    component: TodoPageComponent
  };

  isEditable = false;
  editItemTitleControl = new FormControl<string>(''); //form control for title editing
  editingItemId: number | null = null; //tracks currently edited item

  /**
   * Encapsulates the form control for creating a new to-do list item.
   *
   * Form controls are TypeScript objects that bind to Angular form fields.
   * This enables us to access what the user types into a form field from
   * the TypeScript file.
   */
  newItemFormControl = new FormControl<string>('');

  /**
   * Constructor that runs when the component is created.
   * The constructor also defines fields provided via
   * dependency injection.
   */
  constructor(protected todoService: TodoService) {
    // Set items
    todoService.getItems();
  }

  /** Adds a new item to the to-do list based on the string typed in. */
  addNewItem() {
    // Retrieve the text inputted into the form control.
    const newItemTitle = this.newItemFormControl.value;
    // Use the service to create a new to-do list item, if the title
    // is not null and if it is not empty.
    if (newItemTitle && newItemTitle.length > 0) {
      this.todoService.addItem(newItemTitle);
    }
  }

  /**
   * Toggles the checkmark for the inputted item.
   * @param item: Item to toggle the checkmark for.
   */
  checkmarkPressed(item: ToDoListItem) {
    // Call the appropriate service method to checkmark the item.
    this.todoService.toggleItemCheckmark(item);
  }

  /**
   * Updates the title for inputted item using new "updateItemTitle" method in todo.service.ts
   * needs to be used in html; create new update title button and click event method is this
   * @param item: Item to update
   */
  updateTitle(item: ToDoListItem, title: String) {
    this.isEditable = true;
    this.todoService.updateItemTitle(item, title);
  }

  // Start editing an item
  startEditing(item: ToDoListItem) {
    this.editingItemId = item.id; // item in edit mode
    this.editItemTitleControl.setValue(item.title); // form control with current title
  }

  // save the edited title and exit edit mode
  saveItemTitle(item: ToDoListItem) {
    const updatedTitle = this.editItemTitleControl.value;
    if (updatedTitle && updatedTitle.length > 0) {
      this.todoService.updateItemTitle(item, updatedTitle);
      this.cancelEditing(); // exit edit mode after saving
    }
  }

  // cancel and discard without saving edits
  cancelEditing() {
    this.editingItemId = null; // exit edit mode
    this.editItemTitleControl.reset(); // clear edit input
  }

  /**
   * Deletes an item from the todo list.
   * @param item: Item to delete.
   */
  deleteItem(item: ToDoListItem) {
    // Call the appropriate service method to delete the item.
    this.todoService.deleteItem(item);
  }
}
