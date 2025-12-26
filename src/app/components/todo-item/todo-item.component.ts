import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Still good to have for standard directives if needed, though we use @if/@for
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  template: `
    <div class="group flex items-center justify-between p-4 mb-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-2">
      <div class="flex items-center gap-4 flex-1">
        <button 
          (click)="toggle.emit(todo().id)"
          class="relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          [class.border-purple-500]="todo().completed"
          [class.bg-purple-500]="todo().completed"
          [class.border-gray-500]="!todo().completed"
          [class.hover:border-purple-400]="!todo().completed"
          aria-label="Toggle completed"
        >
          @if (todo().completed) {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          }
        </button>
        
        <span 
          class="text-lg transition-all duration-300 select-none cursor-pointer flex-1"
          [class.text-gray-500]="todo().completed"
          [class.line-through]="todo().completed"
          [class.text-gray-100]="!todo().completed"
          (click)="toggle.emit(todo().id)"
        >
          {{ todo().text }}
        </span>
      </div>

      <button 
        (click)="remove.emit(todo().id)"
        class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-gray-400 hover:text-red-400 focus:opacity-100 focus:outline-none"
        aria-label="Delete todo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  `
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  toggle = output<string>();
  remove = output<string>();
}
