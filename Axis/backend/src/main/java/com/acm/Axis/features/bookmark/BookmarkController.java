package com.acm.Axis.features.bookmark;


import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    public BookmarkRepository bookmarkRepository;

    public BookmarkController(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    @GetMapping("/getCollegeBookmarks/{email}")
    public List<Bookmark> getCollegeBookmarks(@PathVariable String email) {
        return bookmarkRepository.getCollegeBookmarks(email);
    }

    @GetMapping("/getScholarshipBookmarks/{email}")
    public List<Bookmark> getScholarshipBookmarks(@PathVariable String email) {
        return bookmarkRepository.getScholarshipBookmarks(email);
    }

    @GetMapping("/getBookmarks/{email}")
    public List<Bookmark> getBookmarks(@PathVariable String email) {
        return bookmarkRepository.getBookmarks(email);
    }



    @PostMapping("/addScholarship")
    public void addBookmarkScholarship(@RequestParam String email, @RequestParam Long id) {
        bookmarkRepository.addBookmarkScholarship(email, id);
    }

    @PostMapping("/addCollege")
    public void addBookmarkCollege(@RequestParam String email, @RequestParam Long id) {
        bookmarkRepository.addBookmarkCollege(email, id);
    }



    @DeleteMapping("/removeCollege")
    public void removeBookmarkCollege(@RequestParam String email, @RequestParam Long id) {
        bookmarkRepository.removeBookmarkCollege(email, id);
    }

    @DeleteMapping("/removeScholarship")
    public void removeBookmarkScholarship(@RequestParam String email, @RequestParam Long id) {
        bookmarkRepository.removeBookmarkScholarship(email, id);
    }


}
