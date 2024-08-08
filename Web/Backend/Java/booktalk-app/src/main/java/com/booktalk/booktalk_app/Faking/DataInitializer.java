package com.booktalk.booktalk_app.Faking;

import com.booktalk.booktalk_app.Entities.Book;
import com.booktalk.booktalk_app.Entities.Chapter;
import com.booktalk.booktalk_app.Entities.User;
import com.booktalk.booktalk_app.Entities.UserBook;
import com.booktalk.booktalk_app.Repositories.BookRepository;
import com.booktalk.booktalk_app.Repositories.ChapterRepository;
import com.booktalk.booktalk_app.Repositories.UserBookRepository;
import com.booktalk.booktalk_app.Repositories.UserRepository;
import com.github.javafaker.Faker;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import java.util.Optional;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final ChapterRepository chapterRepository;
    private final UserBookRepository userBookRepository;

    private final Faker faker;

    @Value("${NUM_Elem}")
    private int numberOfUsers;

    @PostConstruct
    public void populateDatabaseWithUsers() {
        
        for (int i = 0; i < numberOfUsers; i++) {
            User user = createRandomUser();
            userRepository.save(user);
        }
        for (int i = 0; i < numberOfUsers; i++) {
            Book book = createRandomBook();
            bookRepository.save(book);
        }
        for (int i = 0; i < numberOfUsers; i++) {
            Chapter chapter = createRandomChapter();
            chapterRepository.save(chapter);
        }
        for (int i = 0; i < numberOfUsers; i++) {
            UserBook userBook = createRandonUserBook(i+1);
            userBookRepository.save(userBook);
        }
    }

    private User createRandomUser() {
        User user = new User();
        user.setUsername(faker.name().fullName());
        user.setEmail(faker.internet().emailAddress());
        user.setPassword(faker.internet().password()); // Use a secure password generation method in production
        user.setFrequency((double)faker.number().numberBetween(1, 100));
        return user;
    }
    private Book createRandomBook(){
        Book book = new Book();
        book.setAuthor(faker.book().author());
        book.setTitle(faker.book().title());
        return book;
    }
    private Chapter createRandomChapter(){
        Long id = (long) faker.number().numberBetween(1, numberOfUsers); // can cast to long
        Optional<Book> book = bookRepository.findById( id );
        Chapter chapter = Chapter.builder()
                .name(faker.book().title())
                .book( book.orElse(null) )
                .build();
        return chapter;
    }
    private UserBook createRandonUserBook(int i){
        Long bookId= (long) faker.number().numberBetween(1, numberOfUsers); // hard code the value in the properties
        Long chapterId= (long) i;
        Long userId= (long) faker.number().numberBetween(1, numberOfUsers);

        Optional<Book> book = bookRepository.findById(bookId);
        Optional<User> user = userRepository.findById(userId);
        Optional<Chapter> chapter = chapterRepository.findById(chapterId);

        UserBook userBook = UserBook.builder()
                                        .book(book.orElse(null))
                                        .user(user.orElse(null))
                                        .chapter(chapter.orElse(null))// has to be unique for each
                                        .build();
        return userBook;
    }
}

