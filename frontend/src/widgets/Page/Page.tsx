import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";
import { memo, MutableRefObject, ReactNode, useRef } from "react";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { getScrollSaveBypath, scrollSaveActions } from "features/ScrollSave";
import { UIEvent } from "react";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const scrollTop = useSelector((state: StateSchema) =>
    getScrollSaveBypath(state, pathname),
  );

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef: triggerRef,
    wrapperRef: wrapperRef,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollTop;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollSaveActions.setScrollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      }),
    );
  }, 1000);

  return (
    <section
      ref={wrapperRef}
      onScroll={onScroll}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef}></div>
    </section>
  );
});
