import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPathFromUrl } from "../../../utils/url";

type Breadcrumb = {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;
};

const StyledNav = styled.nav`
  width: 100%;
  padding: 32px 64px;

  ol {
    display: flex;

    li {
      a {
        color: ${({ theme }) => theme.colors.secondary.normal};
      }

      &.with-divider {
        &::after {
          content: "/";
          margin-left: 5px;
          margin-right: 5px;
          color: ${({ theme }) => theme.colors.secondary.normal};
        }
      }
    }
  }
`;

export default function BreadCrumbs() {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[] | null>(null);

  const convertBreadcrumb = (title: string): React.ReactNode => {
    let transformedTitle = getPathFromUrl(title);

    // decode for utf-8 characters and return ascii.
    return decodeURI(transformedTitle);
  };

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return (
    <StyledNav>
      <ol>
        <li className="with-divider">
          <Link href="/">home</Link>
        </li>
        {breadcrumbs?.map((breadcrumb, i) => {
          if (!breadcrumb || breadcrumb.breadcrumb.length === 0) {
            return;
          }
          return (
            <li
              key={breadcrumb.href}
              className={i < breadcrumbs.length - 1 ? "with-divider" : ""}
            >
              <Link href={breadcrumb.href}>
                {convertBreadcrumb(breadcrumb.breadcrumb)}
              </Link>
            </li>
          );
        })}
      </ol>
    </StyledNav>
  );
}
