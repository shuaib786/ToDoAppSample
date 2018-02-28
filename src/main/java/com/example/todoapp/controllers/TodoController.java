package com.example.todoapp.controllers;

import javax.validation.Valid;
import com.example.todoapp.models.Todo;
import com.example.todoapp.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    TodoRepository todoRepository;

    /**
     * For getting non completed todo
     * @return
     */
    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
        Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
        return todoRepository.findByCompleted(false);
    }
    
    /**
     * For geting completed todo
     * @return
     */
    @GetMapping("/todos/completed")
    public List<Todo> getAllTodosCompleted() {
        return todoRepository.findByCompleted(true);
    }
    
    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo) {
    	todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    @GetMapping(value="/todos/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") String id) {
        Todo todo = todoRepository.findOne(id);
        if(todo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        }
    }

    @PutMapping(value="/todos")
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo) {
        Todo todoData = todoRepository.findOne(todo.getId());
        if(todoData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        todoData.setTitle(todo.getTitle());
        todoData.setCompleted(todo.getCompleted());
        Todo updatedTodo = todoRepository.save(todoData);
        return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
    }

    @DeleteMapping(value="/todos/{id}")
    public void deleteTodo(@PathVariable("id") String id) {
        todoRepository.delete(id);
    }
    
    @DeleteMapping(value="/todos/deleteAll")
    public void deleteTodoAll(@PathVariable("id") String id) {
        todoRepository.delete(id);
    }
}
