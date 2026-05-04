package com.sortvisualizer.controller;

import com.sortvisualizer.model.SortRequest;
import com.sortvisualizer.model.SortResponse;
import com.sortvisualizer.service.SortingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sort")
@CrossOrigin(origins = "http://localhost:5173")   // Vite dev server
public class SortController {

    @Autowired
    private SortingService sortingService;

    @PostMapping("/bubble")
    public ResponseEntity<SortResponse> bubbleSort(@RequestBody SortRequest req) {
        return ResponseEntity.ok(sortingService.bubbleSort(req.getArray()));
    }

    @PostMapping("/selection")
    public ResponseEntity<SortResponse> selectionSort(@RequestBody SortRequest req) {
        return ResponseEntity.ok(sortingService.selectionSort(req.getArray()));
    }

    @PostMapping("/insertion")
    public ResponseEntity<SortResponse> insertionSort(@RequestBody SortRequest req) {
        return ResponseEntity.ok(sortingService.insertionSort(req.getArray()));
    }

    @PostMapping("/merge")
    public ResponseEntity<SortResponse> mergeSort(@RequestBody SortRequest req) {
        return ResponseEntity.ok(sortingService.mergeSort(req.getArray()));
    }

    @PostMapping("/quick")
    public ResponseEntity<SortResponse> quickSort(@RequestBody SortRequest req) {
        return ResponseEntity.ok(sortingService.quickSort(req.getArray()));
    }

    @PostMapping("/heap")
    public ResponseEntity<SortResponse> heapSort(@RequestBody SortRequest req) {
        return ResponseEntity.ok(sortingService.heapSort(req.getArray()));
    }

    /** Health check */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Sorting Visualizer API is running");
    }
}
