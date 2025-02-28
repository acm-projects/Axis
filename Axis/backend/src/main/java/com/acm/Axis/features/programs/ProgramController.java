package com.acm.Axis.features.programs;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramRepository programRepository;

    public ProgramController(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }



    @GetMapping("")
    List<Program> getAll() {
        return programRepository.getAll();
    }

    @GetMapping("/{program_id}")
    Program getById( @PathVariable Integer program_id) {
        Optional<Program> program = programRepository.findById(program_id);
        if (program.isEmpty()) {
            throw new IllegalArgumentException("Program not found");
        }

        return program.get();
    }

    @PostMapping("")
    void create(@RequestBody Program program) {
        programRepository.create(program);
    }

    @PutMapping("/{college_id}/{program_id}")
    void update(@PathVariable Integer college_id, @PathVariable Integer program_id, @RequestBody Program program) {
        programRepository.update(program, program_id, college_id);
    }

    @DeleteMapping("/{college_id}/{program_id}")
    void delete(@PathVariable Integer college_id, @PathVariable Integer program_id) {
        programRepository.delete(college_id, program_id);
    }


}
